package co.edu.cue.proyectonuclear.mapping.mappers;

import co.edu.cue.proyectonuclear.domain.entities.Course;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.CourseStudentRequestDTO;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface CourseMapper {

    CourseDTO mapFromEntity(Course course);

    Course mapFromDTO(CourseDTO courseDTO);

    CourseStudentRequestDTO mapStudentRequestFromEntity(Course course);

}
