import {ButtonHTMLAttributes, DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren} from 'react';

export type ReactButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ButtonProps = ReactButtonProps & {
    text: string,
    className?: string,
    onClick? : () => void
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
                                                               text, className, onClick
                                                           }) => {
    return (
        <div>
            <button className={className} onClick={onClick}>{text}</button>

        </div>
    )
}