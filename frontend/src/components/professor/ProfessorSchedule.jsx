import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorResponse } from "../../UI/error/ErrorResponse";
import { getProfessorById } from "../../api/ProfessorApiService";
import { Loading } from "../../UI/loading/Loading";
import { Header } from "../../UI/headers/Header";
import { Flex } from "../../UI/flex/Flex";
import { Button } from "../../UI/button/Button";
import { ScheduleDays } from "./professorSchedule/ScheduleDays";
import { ScheduleModal } from "./professorSchedule/ScheduleModal";
import style from "./Professor.module.css";
import { useAuth } from "../../context/AuthContext";


export const ProfessorSchedule = () => {
	
	const { userId } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [professor, setProfessor] = useState();
	const [schedule, setSchedule] = useState([]);
	const [error, setError] = useState(undefined);
	const [scheduleModal, setScheduleModal] = useState(undefined);
	const [subjectThreeHours, setSubjectsThreeHours] = useState([])
	const [reload, setReload] = useState(false);

	const showScheduleModalHandler = () => {
        setScheduleModal(true);
    }
    const hideScheduleModalHandler = () => {
            setScheduleModal(undefined);
    }

	const errorResponseAction = (error) => {
		setIsLoading(false);
		setError(error);
	};

	const filterSubjects = (subjects) => {
    	return subjects.filter(subject => subject && subject.period === 'TRIMESTRAL' && subject.academicHours === 96);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getProfessorById(userId)
			.then((response) => {
				setReload(false);
				setProfessor(response.data);
				setSchedule(response.data.schedule);
				setSubjectsThreeHours( filterSubjects( response.data.subjects ) );
				
			})
			.then(()=>setIsLoading(false))
			.catch((error) => console.log(error));
	}, [reload]);

	if (error) {
		return (
			<ErrorResponse errStatus={error.response.status}
				errMessage={error.response.data.message} />
		);
	}

	return isLoading ? (
		<Loading />
	) : (
		<Flex height={"100%"}
			width={"100%"}
			direction={"column"}
			alignItems={"center"}
			justifyContent={"none"}>
				{scheduleModal && (
					<ScheduleModal onClick={hideScheduleModalHandler} professor={professor} reload={value => setReload(value)} />
				)}
				<Header>
					<h2>AGREGUE SU DISPONIBILIDAD</h2>
				</Header>
				<Flex height={"auto"}
						width={"80%"}
						direction={"column"}
						className={style["main-container"]}
						justifyContent={"none"}
						alignItems={"center"}>
				{
					professor.schedule.length === 0 ? <h3>No se le han asignado materias</h3> :
					subjectThreeHours.length !== 0 ?
					<h3>Recuerde ingresar al menos tres intervalos de 3 horas para las materias {subjectThreeHours.map(s=> s.name)} </h3>
					: 
					<h3>Recuerde ingresar intervalos de 2 horas para las materias: {professor.subjects.map(s=> s.name)} </h3>
				}
			{
				schedule ? <>
					<div>
						<ScheduleDays schedule={schedule} isProfessor={true} reload={value => setReload(value)} />
					</div>
				<Button inLineStyle={ {width: "200px", height: "50px", margin: "30px"} } onClick={showScheduleModalHandler}>Ingrese su horario</Button>
				</> : <>
				<Button inLineStyle={ {width: "200px", height: "50px", margin: "30px"} } onClick={showScheduleModalHandler}>Ingrese su horario</Button>
				</>
			}
			</Flex>
		</Flex>
	);
}
