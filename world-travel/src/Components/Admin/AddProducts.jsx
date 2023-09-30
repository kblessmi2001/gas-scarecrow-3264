import React, { useState, useEffect } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure,
    Button,
    Center,
} from "@chakra-ui/react";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Select,
    Heading,
    Input,
    Text
} from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, editProduct, getProduct, postUsers, getUsers, deleteUsers } from "../Admin/AdminReducer/action";
import { Spinner } from "@chakra-ui/spinner";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import styled from 'styled-components';

const initState = {
    ind: 0,
    name: "",
    id: "",
};

const AddProducts = () => {
    const showSuccessToast = (message) => {
        toast.success(message, {
            position: 'top-center',
            autoClose: 5000,
        });
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            position: 'top-center',
            autoClose: 5000,
        });
    };

    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [product, setProduct] = useState({
        rating: 0,
        city: '',
        country: '',
        locality: '',
        about: '',
        price: 0,
        images: '',
    });

    const [images, setImages] = useState([]);
    const [city, setCity] = useState('');
    const [eprice, seteprice] = useState('');
    const [country, setCountry] = useState('');
    const [id, setid] = useState(0);

    // const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const handleClick = () => {
    //     dispatch(getProduct())
    // }
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleImages = (e) => {
        if (e.target.value !== '') {
            setProduct({ ...product, images: e.target.value });
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            const addedProduct = await dispatch(addProduct(product));
            showSuccessToast('Product Added Successfully.');
            console.log('Product added:', addedProduct);
            // Reset the product state to an empty state object
            setProduct({
                rating: 0,
                city: '',
                country: '',
                locality: '',
                about: '',
                price: 0,
                images: '',
            });
            document.getElementById("form").reset();
        } catch (error) {
            console.error('Error adding product:', error);
            showErrorToast('Error adding product. Please try again.');
        }
    };

    const destinations = useSelector((store) => store.adminReducer.destinations);

    const isLoading = useSelector((store) => store.adminReducer.isLoading);
    const isError = useSelector((store) => store.adminReducer.isError);

    const handleDeleteProduct = (id) => {
        if (isLoading) {
            return (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </div>
            );
        } else {
            dispatch(deleteProduct(id)).then((res) => {
                showSuccessToast('Product Deleted.');
                dispatch(getProduct());
            });
        }
    };
    const [data, setData] = useState(initState);
    const users = useSelector((store) => store.adminReducer.users);
    const {
        isOpen: addUsersModalOpen,
        onOpen: onAddUsersModalOpen,
        onClose: onAddUsersModalClose,
    } = useDisclosure();


    const handelChange = (e) => {
        const { name, value } = e.target;

        setData((pre) => {
            return {
                ...pre,
                [name]: value,
            };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postUsers(data));
        setData(initState);
    };

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteUsers(id));
    };

    const showdetails = (id) => {
        const product = destinations.find((el) => el.id === id);
        console.log(destinations)
        if (product) {
            setCity(product.city);
            setCountry(product.country);
            // seteprice(product.price);
            setImages(product.images)
            setid(product.id);
        }
    };

    const handleEditProduct = () => {
        const payload = {
            city: city,
            price: +eprice,
            country: country,
            // image:images
        };

        dispatch(editProduct(id, payload)).then(() => {
            showSuccessToast('Product Details have been updated');
            onClose();
            dispatch(getProduct());
        });
    };
    return (
        <div>
            <div sx={{ margin: "2%" }}>
                <div className="addProduct">

                    <TABFORM>
                        {/* <div style={{ display: 'flex' }}> */}
                        <div style={{ marginTop: '50px', height: "100px", marginLeft: '60px', display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                            <div className='division'>

                                <p style={{ fontWeight: 'bolder', paddingTop: "10px", fontSize: "20px" }}> Add Products</p>
                                <p style={{ fontSize: '16px', marginTop: '-10px' }}>Add details of the product here !</p>
                            </div>
                            <div style={{ marginRight: '40px', fontSize: '32px' }}>
                                <button onClick={handleToggle}> <IoMdAddCircle /></button>
                            </div>
                        </div>

                        {toggle && (
                            <div >
                                {/* <DVIVS> */}
                                <Tabs >
                                    <div sx={{ margin: '2%' }}>
                                        <div className="addProduct">
                                            <form action="" onSubmit={handleAddProduct} id="form">
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="City"
                                                    onChange={(e) =>
                                                        setProduct({ ...product, city: e.target.value })
                                                    }
                                                />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Country"
                                                    onChange={(e) =>
                                                        setProduct({ ...product, country: e.target.value })
                                                    }
                                                />
                                                <input
                                                    required
                                                    type="url"
                                                    placeholder="Image"
                                                    onChange={handleImages}
                                                />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Locality"
                                                    onChange={(e) =>
                                                        setProduct({ ...product, locality: e.target.value })
                                                    }
                                                />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="About"
                                                    onChange={(e) =>
                                                        setProduct({ ...product, about: e.target.value })
                                                    }
                                                />
                                                <input
                                                    required
                                                    type="number"
                                                    placeholder="Rating"
                                                    onChange={(e) =>
                                                        setProduct({ ...product, rating: +e.target.value })
                                                    }
                                                />
                                                <button style={{ marginTop: '20px' }}>Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </Tabs>
                                {/* </DVIVS> */}
                            </div>

                        )}
                        {/* </div> */}
                    </TABFORM>
                </div>
                <DVIVS>
                    {isError ? ("Error") : ("")}
                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </div>

                    ) : (
                        <div id="editProduct" style={{ marginTop: "50px" }} >
                            <Center>
                                <TableContainer borderRadius={8} boxShadow={"md"} m={8} p={8} >
                                    <Table variant="striped" colorScheme="grey">
                                        <Thead>
                                            <Tr style={{ backgroundColor: "skyblue" }} >
                                                <Th sx={{ textAlign: 'center' }} style={{ fontSize: "20px" }}>City</Th>
                                                <Th sx={{ textAlign: 'center' }} style={{ fontSize: "20px" }}>Country</Th>
                                                <Th sx={{ textAlign: 'center' }} w={"100%"} style={{ fontSize: "20px" }}>Image</Th>
                                                <Th sx={{ textAlign: 'center' }} style={{ fontSize: "20px" }}>Locality</Th>
                                                {/* <Th sx={{ textAlign: 'center' }}>Price</Th> */}
                                                <Th sx={{ textAlign: 'center' }} style={{ fontSize: "20px" }}>Edit</Th>
                                                <Th sx={{ textAlign: 'center' }} style={{ fontSize: "20px" }}>Delete</Th>
                                                {/* <Th sx={{ textAlign: 'center' }}>View</Th> */}
                                            </Tr>
                                        </Thead>
                                        <Tbody>

                                            {Array.isArray(destinations) &&
                                                destinations.map((e) => (
                                                    <Tr key={e.id} size="lg">
                                                        <Td sx={{ textAlign: 'center' }}>{e.city}</Td>
                                                        <Td sx={{ textAlign: 'center' }}>{e.country}</Td>
                                                        <Td sx={{ textAlign: 'center' }} size="lg"  >
                                                            <img src={e.image} alt="" />
                                                        </Td>
                                                        <Td sx={{ textAlign: 'center' }}>{e.locality}</Td>
                                                        {/* <Td sx={{ textAlign: 'center' }}>{e.rating}</Td> */}
                                                        <Td sx={{ textAlign: 'center' }} w={"200px"}>
                                                            <button onClick={() => { onOpen(); showdetails(e.id); }} id="edit">
                                                                Edit
                                                            </button>
                                                        </Td>
                                                        <Td sx={{ textAlign: 'center' }}>
                                                            <button onClick={() => handleDeleteProduct(e.id)} id="delete">
                                                                Delete
                                                            </button>
                                                        </Td>
                                                        {/* <Td sx={{ textAlign: 'center' }}>
                                        <button onClick={() => handleViewProduct(e.id)} id="view">
                                            View
                                        </button>
                                    </Td> */}
                                                    </Tr>
                                                ))
                                            }
                                            {/* )} */}
                                        </Tbody>


                                    </Table>
                                </TableContainer>
                            </Center>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Edit Product</ModalHeader>
                                    <ModalCloseButton />
                                    {isLoading ? (
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <Spinner
                                                thickness='4px'
                                                speed='0.65s'
                                                emptyColor='gray.200'
                                                color='blue.500'
                                                size='xl'
                                            />
                                        </div>

                                    ) : (
                                        <ModalBody>
                                            <form
                                                action=""
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '10px',
                                                }}
                                            >
                                                <input
                                                    style={{
                                                        width: '35%;',
                                                        border: '2px solid black',
                                                        height: ' 60px',
                                                        padding: '10px',
                                                        fontSize: '18px',
                                                        borderRadius: ' 5px',
                                                    }}
                                                    required
                                                    type="text"
                                                    value={city}
                                                    placeholder="City"
                                                    onChange={(e) => setCity(e.target.value)}
                                                />
                                                <input
                                                    style={{
                                                        width: '35%;',
                                                        border: '2px solid black',
                                                        height: ' 60px',
                                                        padding: '10px',
                                                        fontSize: '18px',
                                                        borderRadius: ' 5px',
                                                    }}
                                                    required
                                                    type="text"
                                                    value={country}
                                                    placeholder="Country"
                                                    onChange={(e) => setCountry(e.target.value)}
                                                />
                                                <input
                                                    style={{
                                                        width: '35%;',
                                                        border: '2px solid black',
                                                        height: ' 60px',
                                                        padding: '10px',
                                                        fontSize: '18px',
                                                        borderRadius: ' 5px',
                                                    }}
                                                    required
                                                    type="number"
                                                    placeholder="Price"
                                                    value={eprice}
                                                    onChange={(e) => seteprice(e.target.value)}
                                                />
                                                <Button
                                                    variant="ghost"
                                                    onClick={handleEditProduct}
                                                    sx={{
                                                        backgroundColor: '#bee3f8',
                                                        fontSize: '18px',
                                                        color: '#2c5282',
                                                        borderRadius: '20px',
                                                        fontWeight: '700',
                                                        width: '50%',
                                                        padding: '5px 20px 5px 20px',
                                                        margin: 'auto',
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </form>

                                        </ModalBody>
                                    )}
                                </ModalContent>

                            </Modal>
                        </div>
                    )}

                </DVIVS>
            </div>
            <ToastContainer
                position="top-center"
                margin="auto"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>

    )
}
export default AddProducts

const DVIVS = styled.div`
Td{
    height:"200px";
    border:"2px solid black";
}
.tab {
  font-size: 24px;
  display: flex;
  align-items: center;
  /* gap: 5px; */
  color: black;
}
.addProduct form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  /* height: 80vh; */
  button {
    background-color: #bee3f8;
    font-size: 18px;
    color: #2c5282;
    border-radius: 20px;
    font-weight: 700;
    padding: 5px 20px 5px 20px;
  }
  input,
  select {
    /* width: 35%; */
    border: 2px solid black;
    height: 60px;
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
  }
}
#edit {
  background-color: green;
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  font-weight: 600;
}
#delete {
  background-color: red;
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  font-weight: 600;
}
#view{
    background-color: blue;
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  font-weight: 600;
}
`;
const TABFORM = styled.div`
        /* border:2px solid black; */
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        
  .tab {
    font-size: 24px;
    display: flex;
    align-items: center;
    /* gap: 5px; */
    color: black;
    margin-left:"-20px";
  }
  .addProduct form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    /* margin-top:20px; */
    /* height: 80vh; */
    /* width:800px; */
   
    button {
      background-color: #bee3f8;
      font-size: 18px;
      color: #2c5282;
      border-radius: 20px;
      font-weight: 700;
      padding: 5px 20px 5px 20px;
      margin-top:"30px";
    }
    input,
    select {
      width: 70%;
      padding-top:100px;
      margin:auto;
      display:flex;
      justify-content:center;
      align-items:center;
      border: 2px solid black;
      height: 50px;
      padding: 10px;
      font-size: 18px;
      padding-left:"20px";
      border-radius: 5px;
    }
    form
    {
        border:2px solid black;
        padding-top:20px;
        /* padding-left:"-20px" */
    }
  }`

