import React, {FC} from 'react';

export type ModalProps = {
    openAdd? : boolean
    children: React.ReactNode
    divClassName?: String | null
}
export const Modal: FC<ModalProps> = ({openAdd, children, divClassName}) => {
    const _className  = "" + divClassName
    return (
        <div>
            {openAdd && (
                <div className={_className}>
                    {children}
                </div>
            )}
        </div>
    )
}

export type ModalContentsProps = {
    children: React.ReactNode
}


export const ModalContents: FC<ModalContentsProps> = ({ children }) => {

    return (
        <div className="w-2/6 h-3/4 bg-white p-4 rounded">
            {children}
        </div>
    )
}
