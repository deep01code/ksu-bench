package sa.edu.ksubench.model.example;/*
package com.mustajal.micro.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

import javax.persistence.*;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Dog.class, name = "Dog"),

        @JsonSubTypes.Type(value = Cat.class, name = "Cat") }
)
@Data
@Entity
@Inheritance
@DiscriminatorColumn(name = "animal_type")
public abstract class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;


}

@Entity
@Data
class Dog extends Animal {

    private String breed;

}

@Entity
@Data
class Cat extends Animal {
     private String favoriteToy;
}


*/
/*
    //{"@type":"Dog","name":"ruffus","breed":"english shepherd"}
    //{"@type":"Cat","name":"goya","favoriteToy":"mice"}
    @Autowired
    AnimalRepository animalRepository;

    @PostMapping("/test-animal")
    public Animal postAnimal(@RequestBody Animal animal){
        return animalRepository.save(animal);
    }

}*/

