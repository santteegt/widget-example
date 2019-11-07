import React from 'react'

const Spinner = ({
    message,
    small,
    className
}: {
    message?: string
    small?: boolean
    className?: string
}) => {
    const classes = className || 'spinner'

    return (
        <div className={classes}>
            {message && (
                <div
                    className="spinnerMessage"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
        </div>
    )
}

export default Spinner
