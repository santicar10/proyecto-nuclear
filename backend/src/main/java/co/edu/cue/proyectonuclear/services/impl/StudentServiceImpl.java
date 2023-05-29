package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.exceptions.UserException;
import co.edu.cue.proyectonuclear.infrastructure.dao.StudentDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateStudentRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.StudentDTO;
import co.edu.cue.proyectonuclear.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentDAO studentDao;
    @Override
    public List<StudentDTO> getAllStudent(){return studentDao.getAllStudent();}

    @Override
    public StudentDTO getStudentById(Long id){
        return studentDao.getStudentById(id);
    }

    @Override //Recibimos el DTO para crear y se lo pasamos al DAO
    public StudentDTO saveStudent(CreateStudentRequestDTO createStudentRequestDTO) {
        if(studentDao.getStudentById(createStudentRequestDTO.id())==null){
            return studentDao.saveStudent(createStudentRequestDTO);
        }
        else throw new UserException("The id is unavailable");
    }

    @Override
    public List<StudentDTO> getBySemester(Integer semester) {return studentDao.getBySemester(semester);}
}
