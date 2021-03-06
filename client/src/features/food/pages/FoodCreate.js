import 'components/form/cusform.scss';

import * as yup from 'yup';

import { FastField, Formik } from 'formik';

import InputField from 'components/form/InputField';
import PropTypes from "prop-types";
import React from 'react';
import foodApi from 'api/foodApi';
import { useHistory } from 'react-router';

FoodCreate.prototype = {
    initialFood: PropTypes.object,
}
FoodCreate.defaultProps = {
    initialFood: undefined,
}

const schema = yup.object().shape({
    name: yup.string().required("this field is required"),
    type: yup.string().required("this field is required"),
    image: yup.string().required("this field is required"),
    description: yup.string().required("this field is required"),
    production: yup.string().required("this field is required"),
    cost: yup.number().required("this field is required"),
    discount: yup.number().required("this field is required"),
    unit: yup.string().required("this field is required"),
    minMass: yup.string().required("this field is required"),
    maxMass: yup.string().required("this field is required"),
});

function FoodCreate({ initialFood }) {

    const history = useHistory();

    const initialValues = {
        name: initialFood ? initialFood.name : "",
        image: initialFood ? initialFood.image : "",
        type: initialFood ? initialFood.type : "",
        description: initialFood ? initialFood.description : "",
        production: initialFood ? initialFood.production : "",
        cost: initialFood ? initialFood.cost : "",
        discount: initialFood ? initialFood.discount : "",
        unit: initialFood ? initialFood.unit : "",
        minMass: initialFood ? initialFood.minMass : "",
        maxMass: initialFood ? initialFood.maxMass : "",
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (initialFood) {
                const response = await foodApi.update({ updatedData: values, foodId: initialFood._id });
                alert(response.message);
                return;
            }
            const response = await foodApi.create({ data: values });
            resetForm({ values: "" });

            alert(response.message);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="food-create">
            <Formik onSubmit={handleSubmit} validationSchema={schema} initialValues={initialValues}>
                {(formikProps) => {
                    const { handleSubmit } = formikProps;

                    return (<form onSubmit={handleSubmit} className="cusform">
                        <h2 className="cusform__title">T???o food</h2>
                        <div className="cusform__row-c3">
                            <FastField
                                name="name"
                                label="T??n food"
                                placeholder="Nh???p t??n ..."

                                component={InputField}
                            />

                            <FastField
                                name="cost"
                                label="Gi??"
                                placeholder="vd: 100"

                                component={InputField}
                            />

                            <FastField
                                name="discount"
                                label="Gi???m gi?? (%)"
                                placeholder="vd: 50"

                                component={InputField}
                            />
                        </div>

                        <FastField
                            name="description"
                            label="M?? t???"
                            placeholder="m?? t??? s???n ph???m"
                            type="textarea"

                            component={InputField}
                        />
                        <div className="cusform__row-c2">
                            <FastField
                                name="image"
                                label="H??nh"
                                placeholder="Link ???nh"

                                component={InputField}
                            />
                            <FastField
                                name="type"
                                label="Lo???i"
                                placeholder="Lo???i s???n ph???m"

                                component={InputField}
                            />
                        </div>

                        <div className="cusform__row-c2">
                            <FastField
                                name="production"
                                label="N??i s???n xu???t"
                                placeholder="Nh???p t??n ..."

                                component={InputField}
                            />
                            <FastField
                                name="unit"
                                label="????n v???"
                                placeholder="vd: 1g/h???p"

                                component={InputField}
                            />
                        </div>
                        <div className="cusform__row-c2">
                            <FastField
                                name="minMass"
                                label="Kh???i l?????ng t???i thi???u"
                                placeholder="vd: 200g"

                                component={InputField}
                            />
                            <FastField
                                name="maxMass"
                                label="Kh???i l?????ng t???i ??a"
                                placeholder="vd : 300g"

                                component={InputField}
                            />
                        </div>

                        <div className="cusform__button">
                            {initialFood && (
                                <div className="cusform__button__btn" onClick={() => { history.goBack() }}>back</div>
                            )}
                            <button className="cusform__button__btn" type="submmit">submit</button>
                        </div>

                    </form>)
                }}
            </Formik>
        </div>
    );
}

export default FoodCreate;