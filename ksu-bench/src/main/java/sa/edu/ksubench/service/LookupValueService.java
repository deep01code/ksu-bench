package sa.edu.ksubench.service;

/*import com.mustajal.micro.DTO.GeneralDTOs.LookupValueDTO;
import com.mustajal.micro.mapper.GlobalMapper;
import com.mustajal.micro.model.lookup.LookupValue;
import com.mustajal.micro.repo.LookupValueRepository;*/
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.NoSuchElementException;

@Service
public class LookupValueService {

   /* @Autowired
    LookupValueRepository lookupValueRepository;

    GlobalMapper globalMapper = Mappers.getMapper(GlobalMapper.class);

    @Transactional
    public ResponseEntity<?> upsertLookupValue( LookupValueDTO lookupValueDTO){
        LookupValue lookupValueResult=new LookupValue();

        if(lookupValueResult.getId()==null){
            lookupValueResult=lookupValueRepository.save(globalMapper.getLookupValueFromDTO(lookupValueDTO));
        }
        else {
            LookupValue dbLookupValue= lookupValueRepository.findById(lookupValueDTO.getId()).get();
            if(dbLookupValue==null){throw new NoSuchElementException();}

            globalMapper.updateLookupValueFromDTO(lookupValueDTO,dbLookupValue);
            lookupValueResult=dbLookupValue;
        }

        return new ResponseEntity<LookupValue>(lookupValueResult, HttpStatus.OK);
    }
*/


}
