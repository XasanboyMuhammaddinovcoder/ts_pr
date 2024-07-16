
export default function page() {
 

    function validate () {}

    function hadnleCLik () {

    }
    return (
        <>
            <div>
                <form className="flex flex-col w-96 mx-auto">
                    <h1 className="font-bold text-5xl text-center mt-12">Login</h1>
                    <input className="h-16 text-2xl px-8 rounded-lg outile-none mt-8 border-cyan-700 border-[1px]" type="email" placeholder="Enter your email" />
                    <input  className="h-16 text-2xl px-8 rounded-lg outile-none mt-8 border-cyan-700 border-[1px]" type="password" placeholder="Enter your password"/>
                    <button className="h-20 my-12 bg-black text-white text-3xl rounded-lg">Save</button>
                </form>
            </div>
        </>
    )
}
