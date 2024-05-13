import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
    let coffee= useLoaderData()
    let {_id, name, quantity, supplier, taste, category, details, photo } = coffee

    let handleUpdateCoffee=e=>{
        e.preventDefault()
        const form=e.target
        let name=form.name.value
        let quantity=form.quantity.value
        let supplier=form.supplier.value
        let taste=form.taste.value
        let category=form.category.value
        let photo=form.photo.value
        let details=form.details.value
        
        let updatedCoffee={name,quantity,supplier,taste,category,details,photo}
        console.log(updatedCoffee)

        // send data
        fetch(`http://localhost:3000/coffee/${_id}`,{
        method:"PUT",
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(updatedCoffee)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
      })

      Swal.fire({
        title: 'Success!',
        text: ' Coffee Updated successfully',
        icon: 'Success',
        confirmButtonText: 'Cool'
      })
    }
    return (
        <div className="bg-[#F4F3F0] p-24">
        <h2 className="text-6xl font-extrabold">Add a Coffee</h2>
        <form onSubmit={handleUpdateCoffee}>
            {/* from name and quantity  row */}
            <div className="md:flex mb-8">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text">Coffee Name</span>
                    </label>
                    <label className="input-group">
                        <input type="text" placeholder="Coffee Name" name="name" defaultValue={name} className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 md:ml-4">
                    <label className="label">
                        <span className="label-text">Available Quantity</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="quantity" 
                        defaultValue={quantity}
                        placeholder="Available Quantity" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* from supplier row */}
            <div className="md:flex mb-8">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text">Supplier</span>
                    </label>
                    <label className="input-group">
                        <input type="text" placeholder="Coffee Name" name="supplier"
                        defaultValue={supplier}
                        className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 md:ml-4">
                    <label className="label">
                        <span className="label-text">Taste</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="taste" placeholder="Available Quantity" 
                        defaultValue={taste}
                        className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* from category and details row */}
            <div className="mb-8 md:flex">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <label className="input-group">
                        <input type="text" placeholder="Category" name="category" 
                        defaultValue={category}
                        className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control md:w-1/2 md:ml-4">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="details" 
                        defaultValue={details}
                        placeholder="Details" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* from photo url row */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <label className="input-group">
                        <input type="text" placeholder="Photo URL" name="photo" 
                        defaultValue={photo}
                        className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            <input type="submit" value="Add Coffee" className="btn btn-block bg-gray-900 text-white"/>
        </form>
    </div>
    );
};

export default UpdateCoffee;