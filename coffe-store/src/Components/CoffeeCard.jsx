import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
    let {_id, name, quantity, supplier, taste, category, details, photo } = coffee
    // console.log(_id)
    let handleDelete=_id=>{
        console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
               
              fetch(`http://localhost:3000/coffee/${_id}`,{
                method:'DELETE'
              })
              .then(res=> res.json())
              .then(data=>{
                console.log(data)
                if(data.deleteCount>0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Coffee has been deleted.",
                        icon: "success"
                      });
                    let remaining=coffees.filter(cof=>cof._id!==_id)
                    setCoffees(remaining)
                }
              })
            }
          });
    }
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure><img src={photo} alt="Movie" /></figure>
                <div className="flex justify-between border-4 border-red-300">
                    <div>
                        <h2 className="card-title">name:{name}</h2>
                        <p>Quantity:{quantity}</p>
                        <p>Supplier:{supplier}</p>
                        <p>Category:{category}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <div className="btn-group btn-group-vertical">
                            <button className="btn btn-active">View</button>
                            <Link to={`updateCoffee/${_id}`}><button className="btn">EDIT</button></Link>
                            <button
                            onClick={()=>handleDelete(_id)}
                            className="btn">X</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;