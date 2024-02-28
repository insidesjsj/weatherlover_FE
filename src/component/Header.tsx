import React, {FC, StyleHTMLAttributes, useState} from 'react';
import {Icon} from '../public/Icon';
import {Button} from '../public/Button';

export type HeaderProps = {
    left?: {
        menu: string,
        style?: React.CSSProperties,
        onClick?: () => void,
        className?: string,
    },
    right?: {
        menu: string,
        style?: React.CSSProperties,
        onClick?: () => void,
        className?: string,
    },
    title: string,
    leftButton?: {
        text: string,
        className?: string,
        onClick?: () => void,
    }
    rightButton?: {
        text: string,
        className?: string,
        onClick?: () => void,
    }
}


export const Header: FC<HeaderProps> = ({title, left, right, leftButton, rightButton}) => {

    return (
        <div>
            <div className="flex justify-between items-center">
                <Icon name={`${left?.menu}`} style={left?.style} className={left?.className} onClick={left?.onClick} />
                <div className="flex items-center text-3xl font-bold">
                    <Button text={leftButton?.text || ''} className={leftButton?.className} onClick={leftButton?.onClick} />
                    <div className="w-96">
                        {title}
                    </div>
                    <Button text={rightButton?.text || ''} className={rightButton?.className} onClick={rightButton?.onClick} />
                </div>
                <Icon name={`${right?.menu}`} style={right?.style} className={right?.className} onClick={right?.onClick} />
            </div>
        </div>
    )
}
