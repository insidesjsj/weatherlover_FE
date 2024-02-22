import React, {FC} from 'react';

export type ModalProps = {
    openAdd? : boolean
    children: React.ReactNode
}
export const Modal: FC<ModalProps> = ({openAdd, children}) => {

    return (
        <div>
            {openAdd && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
