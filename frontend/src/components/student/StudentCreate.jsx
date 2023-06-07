import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { saveStudent } from "../../api/StudentApiService";
import style from "./Student.module.css";
import { careers } from "../../enums/Career";
import Select from "react-select";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { isEmpty } from "../../validations/InputValidations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { UserSubjectsModal } from "../user/UserSubjectsModal";
import { getSubjects } from "../../api/SubjectApiService";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const validateForm = (values) => {
console.log(values);

  const errors = {};
  if (isEmpty(values.nid)) errors.nid = 'El nid no puede ser vacío';
  if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';
  if (isEmpty(values.lastName)) errors.lastName = 'El apellido no puede ser vacío';
  if (isEmpty(values.email)) errors.email = 'El email no debe estar vacío';
  if ((values.semester <= 0 || values.semester > 10)) errors.semester = "El semestre deber ser válido";
  if (isEmpty(values.semester)) errors.semester = 'El semestre no debe estar vacío';
  return errors;
}

const succesResponseAlert = (response) => {
  Swal.fire({
    title: "Estudiante creado",
    text: "Se ha creado el estudiante " + response.data.name,
    icon: "success",
    confirmButtonColor: "green",
    confirmButtonText: "Aceptar"

  })

}

const errorResponseAlert = (error) => {
  Swal.fire({
    title: "Error",
    text: error.response.data.detail,
    icon: "error",
    confirmButtonColor: "red",
    confirmButtonText: "Aceptar"
  })

}


export const StudentCreate = () => {

  const [subjects, setSubjects] = useState([]);
	const succesResponse = (res) => {
		setSubjects(res.data);
	}
	useEffect(()=>{
		getSubjects()
		.then((response) => succesResponse(response))
		.catch((error) => console.log(error));
	}, []);

	const [subjectsAdded, setSubjectsAdded] = useState([]);
	const [subjectsModal, setSubjectsModal] = useState(undefined);

  const [
    studentCareerValue,
    studentCareerValueChangeHandler
  ] = useState("INGENIERIA_DE_SOFTWARE");

  const navigate = useNavigate();

  const createStudentHandler = (values) => {
    const student = {
      nid: values.nid,
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      subjects: subjectsAdded.map((subject) => {return {id: subject.id, name: subject.name}} ),
      career: studentCareerValue,
      semester: values.semester
    }
    saveStudent(student)
      .then(response => succesResponseAlert(response))
      .then(() => navigate("/estudiantes"))
      .catch(error => errorResponseAlert(error))

  }

  const hideSubjectsModalHandler = () => {
		setSubjectsModal(undefined);
	}
	const showSubjectsModalHandler = () => {
        setSubjectsModal(true);
    }
	const confirmSubjectsAddedHandler = (subjects) =>{
		setSubjectsAdded(subjects);
	}
	const removeSubject = (subjectToRemove) => {
		setSubjectsAdded((prevSubject) => prevSubject.filter((subject) => subject !== subjectToRemove));
	}
  
  const selectCareerHandler = ({ value }) => {
    studentCareerValueChangeHandler(value);
  }

  return (
		<Flex
			height={"100%"}
			width={"100%"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"none"}
		>
			{subjectsModal && <UserSubjectsModal subjectsAdded={subjectsAdded} subjects={subjects} onConfirm={confirmSubjectsAddedHandler} onClick={hideSubjectsModalHandler} />}
			<Header>
				<h2 style={{fontSize: "60px"}}>CREAR ESTUDIANTE</h2>
			</Header>
			<Flex
				height={"auto"}
				width={"80%"}
				direction={"column"}
				className={style["main-container"]}
				justifyContent={"none"}
				alignItems={"center"}
			>
				<Flex
					justifyContent={"none"}
					alignItems={"center"}
					direction={"column"}
					gap="20px"
					width={"90%"}
					className={style["create-subject-container"]}
				>
					<Formik
          initialValues={{
            nid: "",
            name: "",
            lastName: "",
            email: "",
			semester: ""
          }} onSubmit={createStudentHandler}
          validate={validateForm}>

						{({errors, touched}) => (
							<Form className={style.form}>
								<Flex
									direction={"column"}
									height={"auto"}
									alignItems={"none"}
									justifyContent={"none"}
									className={ errors.nid && touched.nid ? style["form__item-error"] : style["form__item"] }
								>
									<label
										style={{
											fontSize: "20px",
											color: errors.nid && touched.nid ? "red" : "black" }}>
										Numero de identificación
									</label>
									<Field name="nid" />
									<ErrorMessage name="nid" style={{ fontSize: "17px", color: "red" }} component={"small"} />
								</Flex>
                <Flex
									direction={"column"}
									height={"auto"}
									alignItems={"none"}
									justifyContent={"none"}
									className={ errors.name && touched.name ? style["form__item-error"] : style["form__item"] }
								>
									<label
										style={{
											fontSize: "20px",
											color: errors.name && touched.name ? "red" : "black" }}>
										Nombre
									</label>
									<Field name="name" />
									<ErrorMessage name="name" style={{ fontSize: "17px", color: "red" }} component={"small"} />
								</Flex>
                <Flex
									direction={"column"}
									height={"auto"}
									alignItems={"none"}
									justifyContent={"none"}
									className={ errors.lastName && touched.lastName ? style["form__item-error"] : style["form__item"] }
								>
									<label
										style={{
											fontSize: "20px",
											color: errors.lastName && touched.lastName ? "red" : "black" }}>
										Apellido
									</label>
									<Field name="lastName" />
									<ErrorMessage name="lastName" style={{ fontSize: "17px", color: "red" }} component={"small"} />
								</Flex>
                <Flex
									direction={"column"}
									height={"auto"}
									alignItems={"none"}
									justifyContent={"none"}
									className={ errors.email && touched.email ? style["form__item-error"] : style["form__item"] }
								>
									<label
										style={{
											fontSize: "20px",
											color: errors.email && touched.email ? "red" : "black" }}>
										Email
									</label>
									<Field name="email" />
									<ErrorMessage name="email" style={{ fontSize: "17px", color: "red" }} component={"small"} />
								</Flex>

								<Flex direction={"column"}	height={"auto"} alignItems={"none"} justifyContent={"none"}>
									<Flex justifyContent={"none"} gap={"10px"}>
										<label style={{ fontSize: "20px" }}>Materias </label>
										<IoIosAddCircle className={style["button__add-subject"]} onClick={showSubjectsModalHandler} />
									</Flex>
									{subjectsAdded.length === 0 ? <p>No hay materias agregadas</p> : 
									subjectsAdded.map((subject, index) => (
										<Flex key={index} justifyContent={"none"} height={"50px"}>
											<p className={style["subject-list"]}>{subject.name}</p>
											<AiOutlineClose className={style["subject-list__remove"]} onClick={removeSubject.bind(null, subject)} />
										</Flex>
									))}
								</Flex>
                <Flex
                  direction={"column"}
                  height={"auto"}
                  alignItems={"none"}
                  justifyContent={"none"}
                  className={style["form__item"]}
                >
                    <label style={{ fontSize: "20px" }}>Carrera</label>
                    <Select
                      onChange={selectCareerHandler}
                      defaultValue={{ label: careers[0].name, value: careers[0].value }}
                      noOptionsMessage={() => "No se encontraron carreras "}
                      className={style.select}
                      options={careers.map((career) => ({
                        abel: career.name,
                        value: career.value,
                      }))}
                    />
                  </Flex>

                <Flex>
                  <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }}>Guardar</Button>
                  <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px" }} onClick={() => navigate("/estudiantes")}>Cancelar</Button>
                </Flex>
							</Form>
						)}
					</Formik>
				</Flex>
			</Flex>
		</Flex>
	);
 
};