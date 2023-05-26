package co.edu.cue.proyectonuclear.services;

import co.edu.cue.proyectonuclear.mapping.dtos.SubjectDTO;

import java.util.List;
import java.util.Optional;

public interface SubjectService {
    SubjectDTO createSubject(SubjectDTO subjectDTO);
    List<SubjectDTO> getAllSubjects();
    Optional<SubjectDTO> getSubjectById(Long id);
}
