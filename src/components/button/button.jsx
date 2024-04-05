const Button = ({size, onClick, children}) => {
    const classes = `flex-1 bg-default-blue rounded`
    const containerClasses = `flex ${size || 'w-60 h-10'} flex rounded bg-gradient-to-r from-violet-500 hover:from-violet-700 to-blue-700 hover:to-violet-600 p-0.5 shadow-lg`
    const spanClasses = `text-lg font-medium`

    const renderButton = () => (
        <div className={containerClasses}>
            <button className={classes}>
            <span className={spanClasses}>{children}</span>
            </button>
        </div>
        
    );

    return renderButton();
}

export default Button;