package co.edu.cue.proyectonuclear.services.impl;

import co.edu.cue.proyectonuclear.domain.entities.Professor;
import co.edu.cue.proyectonuclear.exceptions.UserCreationException;
import co.edu.cue.proyectonuclear.infrastructure.constrains.ProfessorConstrain;
import co.edu.cue.proyectonuclear.infrastructure.constrains.UserConstrain;
import co.edu.cue.proyectonuclear.infrastructure.dao.ProfessorDAO;
import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.mappers.ProfessorMapper;
import co.edu.cue.proyectonuclear.services.ProfessorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {
    private final ProfessorDAO professorDAO;
    private final ProfessorConstrain professorConstrain;
    private final UserConstrain userConstrain;

    @Override
    public List<ProfessorDTO> getAllProfessors() {
        return professorDAO.getAllProfessors();
    }

    @Override
    public Optional<ProfessorDTO> getProfessorById(String nid) {
        return professorDAO.getProfessorById(nid);
    }

    //TODO Delete subject in professor

    @Override
    public ProfessorDTO saveProfessor(CreateProfessorRequestDTO professor) {
        //TODO split the validations
        //Validate that the professor is unique for the subject
        professorConstrain.validateSubjects(professor.subjects());
        if(userConstrain.validateNidUser(professor.nid())) {
            return professorDAO.createProfessor(professor);
        }
        else{
            throw new UserCreationException("The id is unavailable");
        }
    }
}
