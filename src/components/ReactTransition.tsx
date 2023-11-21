import {
    createElement,
    ReactElement,
    forwardRef,
    useEffect,
    useState,
    useRef
} from 'react'

interface TransitionProps {
    children: ReactElement,
    value: boolean,
    name?: string,
    onTransitionend?: () => boolean,
}

export const ReactTransition = forwardRef(
    function ReactTransition({children, value = true, name = 'fade', onTransitionend}: TransitionProps
        , externalRef
    ) {

        const [isShow, setIsShow] = useState(value)
        const localeTransitionRef = useRef<HTMLDivElement | null>(null)
        const timeoutRef = useRef<number>(0)

        const setRef = (node: HTMLDivElement) => {
            localeTransitionRef.current = node;
            if (typeof externalRef === 'function') {
                externalRef(node);
            } else if (externalRef) {
                externalRef.current = node;
            }
        }

        if (!isShow && value) {
            setIsShow(value)
        }

        const childrenClasses = children.props.className ? `${children.props.className} ` : ''
        const className = `${childrenClasses}${name}-enter-from ${name}-enter-active`

        const transitionElement = createElement(children.type, {
            ...children.props,
            className,
            ref: setRef,
            onTransitionEnd: () => {
                if (!value) {
                    setIsShow(false)
                }
                if (onTransitionend) {
                    onTransitionend()
                }
            },
        })

        useEffect(() => {
            const { current: transitionRef } = localeTransitionRef;
            if (!transitionRef) return;

            timeoutRef.current = setTimeout(() => {
                if (transitionRef) {
                    const actionClass = value ? 'remove' : 'add';
                    transitionRef.classList[actionClass](`${name}-enter-to`);
                    transitionRef.classList[actionClass](`${name}-enter-from`);
                }
            }, 0);

            return () => clearTimeout(timeoutRef.current)
        }, [value, name])

        return isShow ? transitionElement : ''
    }
)
