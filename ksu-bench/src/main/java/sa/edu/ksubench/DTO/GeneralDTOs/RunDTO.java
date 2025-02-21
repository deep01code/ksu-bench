package sa.edu.ksubench.DTO.GeneralDTOs;

import sa.edu.ksubench.model.lookup.RunStatus;

import java.time.LocalDateTime;

public class RunDTO {
    Long id;
    LocalDateTime startTime;
    LocalDateTime endTime;
    RunStatus status;
}
