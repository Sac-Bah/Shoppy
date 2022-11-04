import React, { useEffect, useState } from 'react'
import {  addDoc, collection, doc, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useLogin } from '../../AuthContext'
import { db, storage} from '../../Firebase'

function ProductForm() {
  const navigate = useNavigate()
  const{isLoggedIn}= useLogin()
  
  const [file,setFile]=useState('')
  const [data,setData]=useState({})
  const [per, setPerc] = useState(null);


  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, `productImages/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);



  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };


const handleAdd = async (e) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, "products"), {
      ...data
    });
    navigate('/')
  } catch (err) {
    console.log(err);
  }
};

let errNB='Have a limit Of 3-12 characters'
let errDes='Can\'t reach more than 50 words'
let errSizePp='Numbers only'

  return (
    <div>
      <div className='form-div'>
      <form className='p-form'>
        <div className='form-inp-div'>
        <label className='form-lbl' htmlFor='brand'>Brand:</label>
        <input className='form-inp' type='text' placeholder='brand~' id='brand' onChange={handleInput}></input>
       <div className='err-div'> <span className='error'>{errNB}</span></div>
        </div>

        <div className='form-inp-div'>
        <label className='form-lbl' htmlFor='name'>Name:</label>
        <input className='form-inp' type='text' pattern='john' placeholder='name' id='name' onChange={handleInput} required></input>
        <div className='err-div'> <span className='error'>{errNB}</span></div>
        </div>

        <div className='form-inp-div'>
        <label className='form-lbl' htmlFor='description'>Description:</label>
        <div className='txt-area-div'><textarea className='form-inp-ta'  placeholder='description...' id='description' onChange={handleInput} required></textarea></div>
        <div className='err-div'> <span className='error'>{errDes}</span></div>
        </div>

        <div className='form-inp-div'>
        <label className='form-lbl' htmlFor='size'>Size:</label>
        <input className='form-inp' type='text' placeholder='e.g 28mm' id='size' onChange={handleInput} required></input>
        <div className='err-div'> <span className='error'>{errSizePp}</span></div>
        </div>

        <div className='form-inp-div'>
        <label className='form-lbl' htmlFor='colour'>Colour:</label>
        <input className='form-inp' type='text' placeholder='colour' id='colour' onChange={handleInput}></input>
        </div>

        <div className='form-inp-div' >
        <label className='form-lbl' htmlFor='price'>Price:</label>
        <input className='form-inp' type='number' placeholder='0 Rs' id='price' onChange={handleInput} required></input>
        <div className='err-div'> <span className='error'>{errSizePp}</span></div>
        </div>

        <img className='form-img' src={file ? URL.createObjectURL(file):'https://static.vecteezy.com/system/resources/previews/004/511/733/original/camera-icon-on-white-background-vector.jpg'}/>
        <input type='file'  id='product-img'  accept='image/*' onChange={(e) => setFile(e.target.files[0])}></input> 
        <div className='div-lbl-form'>
        <label htmlFor='product-img' className='form-img-inp'>
            🖍
        </label>
        </div>

    <div className='form-btn-div'>
        <button disabled={per !== null && per < 100} type="submit" className='form-btn' onClick={handleAdd}>Send</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default ProductForm
