const Background = ({children}) => {
    return <div className="bg-gray-100 w-screen h-screen relative overflow-hidden flex justify-center items-center">
        <img rel="o_top_left" src="/O_orange.svg" className="absolute left-0 top-0 -mt-20 -ml-20 h-88"/>
        <img rel="o_bottom_right" src="/O_orange.svg" className="absolute right-0 bottom-0 -mb-20 -mr-20 h-88"/>
        <img rel="x_top_right" src="/X_blue.svg" className="absolute right-0 top-0 -mt-20 -mr-20 h-88"/>
        <img rel="x_bottom_left" src="/X_blue.svg" className="absolute bottom-0 left-0 -mb-20 -ml-20 h-88"/>
        <div className="rounded-2xl w-3/4 h-3/4 bg-white flex justify-center items-center shadow-mdO z-50 p-10">
            {children}
        </div>
    </div>
}

export default Background;