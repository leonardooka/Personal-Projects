const Button = ({size, onClick, children, isDisabled = false}, submit = false) => {
    const classes = `flex-1 bg-default-blue rounded`
    const containerClasses = `flex ${size || 'w-60 h-10'} ${isDisabled && 'opacity-90'} flex rounded bg-gradient-to-r from-violet-500 hover:from-violet-700 to-blue-700 hover:to-violet-600 p-0.5 shadow-lg`
    const spanClasses = `text-lg font-medium`

    const renderButton = () => (
        <div className={containerClasses}>
            <button className={classes} onClick={onClick || null} disabled={isDisabled} type={submit? 'submit' : 'button'}>
            <span className={spanClasses}>{children}</span>
            </button>            
        </div>
        
    );

    return renderButton();
}

export default Button;