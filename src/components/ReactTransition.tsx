import {createElement, forwardRef, ReactElement, useEffect, useRef, useState} from 'react'

export const ReactTransition =
    forwardRef(function AppTransition(
            {
                children,
                value = true,
                name = 'fade',
                onTransitionend
            }: TransitionProps, ref) {

            const [isShow, setIsShow] = useState(value)
            const localeTransitionRef = useRef<HTMLDivElement | null>(null)
            const timeoutRef = useRef<number>(0)

            let transitionRef: HTMLDivElement

            if (!isShow && value) {
                setIsShow(value)
            }

            const childrenClasses = children.props.className
                ? `${children.props.className} `
                : ''
            const className = `${childrenClasses}${name}-enter-from ${name}-enter-active`

            const transitionElement = createElement(children.type, {
                ...children.props,
                className,
                ref: (node: HTMLDivElement) => {
                    transitionRef = localeTransitionRef.current = node;
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        transitionRef = ref.current = node;
                    }
                },
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
                if (transitionRef === null) return
                timeoutRef.current = setTimeout(() => {
                    if (value && transitionRef) {
                        transitionRef.classList.add(`${name}-enter-to`)
                        transitionRef.classList.remove(`${name}-enter-from`)
                    } else if (transitionRef) {
                        transitionRef.classList.remove(`${name}-enter-to`)
                        transitionRef.classList.add(`${name}-enter-from`)
                    }
                }, 0)
                return () => clearTimeout(timeoutRef.current)
            }, [value])

            return isShow ? transitionElement : ''
        }
    )

interface TransitionProps {
    children: ReactElement,
    value: boolean,
    name?: string,
    onTransitionend?: () => boolean,
}
