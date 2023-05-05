import { Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';;


const Newhome = ({ handleClick }) => {
    const obj = {
        name: "",
    }
    const [producttable, setProducttable] = useState([]);
    const [watch, setWatch] = useState(obj)

    console.log('watch', watch)



    const productlisttable = async () => {
        await axios
            .get('http://localhost:8080/get-watch')
            .then((res) => {
                setProducttable(res.data);

            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        productlisttable()
    }, []);



    const handleSelect = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setWatch({ ...watch, [name]: value })
    };


      const handleDisplay = () => {
        axios.post('http://localhost:8080/watch', watch)
          .then(response => {
            console.log("responseeeeeeeeeeeeeeeee", response);
            setProducttable(response.data.profile); // update producttable state with the response data
          })
          .catch(error => {
            console.error(error);
          });
      };

    return (
        <>

            <FormControl sx={{ m: 1, minWidth: "180px" }} >
                <InputLabel id="demo-simple-select-label" style={{minwidth:"220px"}}>Slelect watch brand</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={watch.name}
                    label="Age"
                    name="name"
                    onChange={handleSelect}
                >
                    <MenuItem value="titan">Titan</MenuItem>
                    <MenuItem value="rado">Rado</MenuItem>
                    <MenuItem  value="rolex">Rolex</MenuItem>
                </Select>
                
            </FormControl>
            <Button variant="contained" onClick={handleDisplay} style={{marginTop:"20px",width:"100px "}}>Search</Button>
            <Grid container style={{ marginTop: "60px"}}>
                {
                    Array.isArray(producttable) && producttable.length > 0 ? (
                        <Grid container item spacing={3} style={{marginLeft:"10px"}}>
                            {producttable && producttable.map((item, index) => (
                                <Card sx={{ maxWidth: 330, maxHeight: 370, marginTop: '30px', marginLeft: '30px' }}>
                                    <CardMedia
                                        component="img"
                                        alt={item.name}
                                        height="140"
                                        src={`http://localhost:8080/Images/` + producttable[index].image}
                                        style={{ height: "50%", width: "100%" }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                      {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                           
                                            Material : {item.material} | Features : {item.features} price :
                                            {item.price} colour : {item.colour}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => handleClick(item)} >Add to Cart</Button>

                                    </CardActions>
                                </Card>
                            ))}
                        </Grid>
                    ) : (
                        <p>no items to display</p>
                    )
                }

            </Grid>
        </>
    )
}

export default Newhome
