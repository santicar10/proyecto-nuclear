package co.edu.cue.proyectonuclear.domain.entities;

import co.edu.cue.proyectonuclear.domain.enums.Career;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Subject {
    @Id
    @GeneratedValue
    private  Long id;
    private String name;

    @Enumerated(EnumType.STRING)
    private Career career;
    private Integer semester;
    private  Integer credits;


}
