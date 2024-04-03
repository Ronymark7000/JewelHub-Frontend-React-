import { Formik, Form, Field } from "formik";
import { Label } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axiosInstance";
import empty1 from "../../../assets/empty.png";
import { Button } from "react-bootstrap";
import ThreeSixty from "react-360-view";
import { ItemSchema } from "../../../services/ItemValidation";
import { emitErrorToast, emitInfoToast, emitSuccessToast } from "../../../site/components/Toast/EmitToast";

function AddItems({editItem}){
    const navigate = useNavigate();  

    const [form, setForm] = useState({
        itemName: "",
        material: "Gold",
        karat:"24",
        grossWeight:"",
        wastage:"",
        netWeight:"",
        goldPrice:"",
        costOfStome:"",
        manufactureCost:"",
        description: "",
        totalCost: "",
        itemImageUrl: "",
      }
    );

    useEffect(() => {
        if (editItem) {
          setForm((prev) => ({ ...prev, ...editItem }));
        }
      },
    [editItem]);

    const handleImageChange = (event) => {
      const image = event.target.files[0];
      setForm((prev) => ({ ...prev, itemImageUrl: image }));
    };

    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    const handleImageChange1 = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };


    const forSubmit = async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key !== 'itemImageUrl') {
            formData.append(key, value);
          }
        });
    
        // Append the image file to the FormData if it exists
        if (values.itemImageUrl) {
          formData.append('itemImage', values.itemImageUrl);
        }
    
        if (editItem) {
           await axiosInstance.put(`/item/${editItem?.itemCode}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
           });
           emitInfoToast("Updated Item Successfully");
         } else {
           await axiosInstance.post("/item", formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
           });
           emitSuccessToast("Added Item Successfully");
         }
        navigate("/admin/item-dashboard");
        // Reset the form after successful submission
        resetForm();
      } catch (error) {
        console.error(error);
        emitErrorToast("Error Adding Item");
      }
    };

    return (
        <>
            <div style={{ width: "1080px", color:"#62605A", marginLeft:"340px", marginRight:"120px", marginTop:"20px", height: "700px", overflow: "auto"}}>
                
                <Formik initialValues={ form } onSubmit={forSubmit} validationSchema={ItemSchema} enableReinitialize>
                    {({ errors, touched }) => (
                  
                    <Form style={{width: "100%"}}>
                        <div>
                            <Label for="exampleAbc" style={{marginTop:"5px", marginBottom: "15px", fontSize: "35px"}}>
                                <b>Item Form</b>
                            </Label>
                        </div>

                  <div className="d-flex justify-content-between">
                  {/* Left side of the form */}
                   
                      <div style={{ width:"490px", marginRight:"45px"}}>
                        <div style={{marginLeft:"70px", marginBottom:"15px"}}>
                        {form.itemImageUrl ? (
                          <img
                            src={URL.createObjectURL(form.itemImageUrl)}
                            alt="Selected Image"
                            style={{ width: "320px", height: "300px", marginTop: "10px" }}
                          />
                        ) : (
                          <img
                            src={empty1}
                            alt="Blank Image"
                            style={{ width: "320px", height: "300px", marginTop: "10px" }}
                          />
                        )}
                          <div style={{marginLeft:"100px"}}>
                            <p><b>Image Preview</b></p>
                          </div>
                        </div>

                        <div className="form-group row mb-3 " style={{ width: "100%" }}>
                    
                          <input style={{ marginLeft: "60px" }} className="form-control form-control-sm w-75" type="file" id="formFile" onChange={handleImageChange} />              
                        </div>
                          
                          <div style={{marginLeft:"70px", marginBottom:"15px"}}>
                          {/* {selectedImageUrl ? ( */}
                            {/* <ThreeSixty
                              amount={36}
                              imagePath="https://iconasys.com/Downloads/360/360-jewelry-photography-earring-set-2/iframe.html"
                              fileName="360_{index}.jpg?v1"
                              style={{ width: "320px", height: "300px", marginTop: "10px" }}
                              title="360 Image"
                            /> */}
                          {/* ) : (
                            <img
                              src={empty1}
                              alt="Blank Image"
                              style={{ width: "320px", height: "300px", marginTop: "10px" }}
                            />
                          )} */}
                          <div style={{ marginLeft: "90px" }}>
                            <p><b>360° Image Preview</b></p>
                          </div>
                        </div>

                        <div className="form-group row mb-3 " style={{ width: "100%" }}>
                          <input
                            style={{ marginLeft: "60px" }}
                            className="form-control form-control-sm w-75"
                            type="file"
                            id="formFile360"
                            onChange={handleImageChange1}
                          />
                        </div>
                      </div>
                        
                    {/* Rigth Side of the form */}
                      <div style={{ width:"500px", paddingTop:"5px"}}>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputItemName"><b>Item Name</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="itemName" placeholder="Enter item name" type="text"/>
                            {errors.itemName && touched.itemName ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.itemName}
                              </div>
                            ) : null}
                          </div>
                        </div>    

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputMaterial"><b>Material</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control w-100" name="material" as="select">
                              <option>Gold</option>
                              <option>Silver</option>
                            </Field>
                          </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputKarat"><b>Karat</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control w-100" name="karat" as="select">
                            <option value="24">24k</option>
                            <option value="22">22k</option>
                            <option value="20">20k</option>
                            <option value="18">18k</option>
                            </Field>
                          </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputGrossWeight"><b>Gross Weight</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="grossWeight" placeholder="Enter gross weight" type="text"/>
                            {errors.grossWeight && touched.grossWeight ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.grossWeight}
                              </div>
                            ) : null}
                          </div>
                        </div> 

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputWastage"><b>Wastage</b></label>
                          <div className="col-sm-8">
                            <div className="input-group">
                              <Field className="form-control" name="wastage" placeholder="Enter material wastage" type="text"/>
                              <span className="input-group-text">%</span> {/* Display percentage symbol */}
                            </div>
                            {errors.wastage && touched.wastage ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.wastage}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Net Weight</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="netWeight" placeholder="Enter net weight" type="text"/>
                            {errors.netWeight && touched.netWeight ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.netWeight}
                              </div>
                            ) : null}
                          </div>
                        </div> 

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Gold Price</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="goldPrice" placeholder="Enter gold price" type="text"/>
                            {errors.goldPrice && touched.goldPrice ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.goldPrice}
                              </div>
                            ) : null}
                          </div>
                        </div> 

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Cost of Stone</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="costOfStone" placeholder="Enter cost of stone" type="text"/>
                          </div>
                        </div> 

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Manufacture Cost</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="manufactureCost" placeholder="Enter manufacture cost" type="text"/>
                            {errors.manufactureCost && touched.manufactureCost ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.manufactureCost}
                              </div>
                            ) : null}
                          </div>
                        </div> 

                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputDescription"><b>Description</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="description" placeholder="Enter description" as="textarea" rows={3} />
                          </div>
                        </div>
                        
                        <div className="form-group row mb-3 justify-content-center" style={{ width: "100%" }}>
                          <label className="col-sm-4 col-form-label" htmlFor="exampleInputNetWeight"><b>Total Cost</b></label>
                          <div className="col-sm-8">
                            <Field className="form-control" name="totalCost" placeholder="Enter Total cost" type="text"/>
                            {errors.totalCost && touched.totalCost ? (
                              <div className="text-danger blockquote-footer mt-1">
                                {errors.totalCost}
                              </div>
                            ) : null}
                          </div>
                        </div> 

                        <div style={{marginLeft:"110px", marginBottom:"100px", marginTop:"30px"}}>
                          <Button color="primary m-3 w-100" type="submit" style={{ backgroundColor:"#0ba6ff", paddingLeft:"20px", paddingRight:"20px", marginTop:"20px"}}>
                            Save Item
                          </Button>

                          <Button color="secondary m-3 w-75"  style={{ backgroundColor:"#fa5768", marginTop:"20px", marginLeft:"15px"}}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>

                    
                  </Form>
                  )}
                </Formik>
            </div>
        </>
    );
};

export default AddItems;