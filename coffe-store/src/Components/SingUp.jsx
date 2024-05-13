import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const SingUp = () => {
    let{createUser}=useContext(AuthContext)

    let handleSignUp=e=>{
        e.preventDefault()
        let form=e.target
        let email=form.email.value
        let password=form.password.value
        console.log(email,password)
        createUser(email,password)
        .then(result=>{
            console.log(result.user)
            let createdAt=result.user?.metadata?.creationTime
            let user ={email,createdAt:createdAt}
            fetch('http://localhost:3000/user',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
            })
        })
        .catch(error=>{
            console.error(error)
        })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password"
                                name="password"
                                 className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingUp;