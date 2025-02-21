package sa.edu.ksubench.DTO.GeneralDTOs;


import lombok.Data;
import sa.edu.ksubench.model.actor_domain.user.ActorType;
import sa.edu.ksubench.model.actor_domain.user.GenderType;
import sa.edu.ksubench.model.actor_domain.user.RegistrationType;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
public class ActorDTO {

    public String imgUrl,username,password,nationalId,email;

   // public double rate,height,weight,neck,chest,biceps,waist,hip,thighs,calves;

   // public Date dateOfBirth,registrationDate;

   // public GenderType genderType;

   // public RegistrationType registrationType;

    public ActorType actorType;
}
