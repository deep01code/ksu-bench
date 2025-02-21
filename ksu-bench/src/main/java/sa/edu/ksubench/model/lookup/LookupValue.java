package sa.edu.ksubench.model.lookup;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class LookupValue {

    public LookupValue() {
    }

    public LookupValue(String value, LookupValueType lookupValueType) {
        this.value = value;
        this.lookupValueType = lookupValueType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    String value;

    @EqualsAndHashCode.Include
    @Enumerated(EnumType.STRING)
    @Column(unique = true)
    LookupValueType lookupValueType;

}
