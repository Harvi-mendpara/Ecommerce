import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [boxImag, setBoxImg] = useState([]);

  //get api--------
  const getProduct = async () => {
    await axios.get('http://localhost:8080/watch', {
      headers: {
        authorization: `${JSON.parse(localStorage.getItem("token"))}`
      }
    })
      .then((response) => {
        console.log("watchhhhhhhhhhh", response.data);
        console.log("----------img", response.data[0].image);
        setProducts(response.data);
        setBoxImg(response.data)
      }, (error) => {
        console.log(error);

      });
  }
  useEffect(() => {
    getProduct()
  }, [])

  //delete api-----------------
  const deleteProduct = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/watch/${_id}`, {
        headers: {
          authorization: `${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      console.log("delete----------------------", response.data);
      // update the products state after successful deletion
      setProducts(products.filter((item) => item._id !== _id));
    } catch (error) {
      console.log(error);
    }
  };

  //search api---------------

  const handleSearch = async (e) => {
    try {
      const key = e.target.value;
      if (key) {

        const response = await axios.get(`http://localhost:8080/search/${key}`, {
          headers: {
            authorization: `${JSON.parse(localStorage.getItem("token"))}`
          }
        });
        console.log("search result:", response.data);
        setProducts(response.data);
      } else {
        getProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <>

      <>
        <TableContainer component={Paper} style={{width:"70%",marginTop:"55px",marginLeft:"256px"}}>
          <Table  aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Sr.No</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Material</StyledTableCell>
                <StyledTableCell align="right">Features</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Colour</StyledTableCell>
                <StyledTableCell align="right">Waruanty</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((item, index) => {
                  return (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell  align="right">{index + 1}</StyledTableCell>
                      <StyledTableCell  align="right"> 
                      <img src={`http://localhost:8080/Images/` + boxImag[index].image} alt={item.name} style={{ height: "60px" }} />
                      </StyledTableCell>
                      <StyledTableCell align="right">{item.name} </StyledTableCell>
                      <StyledTableCell align="right">{item.material}</StyledTableCell>
                      <StyledTableCell align="right">{item.features}</StyledTableCell>
                      <StyledTableCell align="right">{item.price}</StyledTableCell>
                      <StyledTableCell align="right">{item.colour}</StyledTableCell>
                      <StyledTableCell align="right">{item.warunty}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Link to={"/update/" + item._id}>
                          <ModeEditIcon style={{ color: "#7FB5FF" }} />
                        </Link>
                        <DeleteIcon onClick={() => deleteProduct(item._id)} style={{ color: "#F45050" }} />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    </>
  )
}

export default Product
