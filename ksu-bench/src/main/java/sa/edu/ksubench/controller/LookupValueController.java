package sa.edu.ksubench.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
/*import sa.edu.ksubench.DTO.GeneralDTOs.LookupValueDTO;*/
import sa.edu.ksubench.model.lookup.LookupValue;
/*import sa.edu.ksubench.repo.LookupValueRepository;*/
import sa.edu.ksubench.service.LookupValueService;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class LookupValueController {

    //getAll

    //update

/*    @Autowired
    LookupValueRepository lookupValueRepository;*/


    @Autowired
    LookupValueService lookupValueService;

/*    @GetMapping("/lookup-values")
    public ResponseEntity<?> getAllLookupValues(){
        return new ResponseEntity<List<LookupValue>>(lookupValueRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/upsert-lookup-value")
    public ResponseEntity<?> upsertLookupValue(@RequestBody LookupValueDTO lookupValueDTO){
        return lookupValueService.upsertLookupValue(lookupValueDTO);
    }*/

}
