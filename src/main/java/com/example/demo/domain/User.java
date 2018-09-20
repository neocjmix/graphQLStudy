package com.example.demo.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Frank.Park on 2018. 9. 20..
 */

@Table
@Entity
@Getter
@Setter
public class User {
    @Id
    private Long id;
    private String name;
    private String username;
    private Boolean isVacation;

    @ManyToMany(mappedBy = "user")
    private List<Department> department;

    @Getter
    @Setter
    public class UserInput {
        private Long id;
        private String name;
        private String username;
        private Boolean isVacation;
        private List<Long> department;
    }
}
