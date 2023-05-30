package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseStudentRequestDTO;

import java.util.List;
import java.util.Optional;

public interface CourseDAO {

    CourseDTO saveCourse(CourseDTO course);
    List<CourseDTO> getAllCourses();
    CourseDTO findCourseById(Long id);
    List<CourseDTO> getCoursesByProfessorId(Long professorId);


    List<CourseStudentRequestDTO> getCoursesByStudentId(Long id);
}
