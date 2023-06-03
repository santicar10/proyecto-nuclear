package co.edu.cue.proyectonuclear.infrastructure.dao;

import co.edu.cue.proyectonuclear.mapping.dtos.CreateProfessorRequestDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorDTO;
import co.edu.cue.proyectonuclear.mapping.dtos.ProfessorScheduleDTO;

import java.util.List;
import java.util.Optional;

public interface ProfessorDAO {
    List<ProfessorDTO> getAllProfessors();
    ProfessorDTO createProfessor(CreateProfessorRequestDTO professor);
    Optional<ProfessorDTO> getProfessorByNid(String nid);
    Optional<ProfessorDTO> getProfessorById(Long id);
    Optional<ProfessorDTO> getProfessorBySubject(Long idSubject);
    ProfessorDTO deleteProfessor(ProfessorDTO professorDTO);
    ProfessorDTO updateProfessor(ProfessorDTO professor);
    ProfessorScheduleDTO saveScheduleProfessor(Long id, ProfessorScheduleDTO professorScheduleDTO);
}