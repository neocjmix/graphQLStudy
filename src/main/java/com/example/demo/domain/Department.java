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
public class Department {
    @Id
    private Long id;
    private String name;
    private String category;

    /*
    Department: {
        user: (department, args, context, info) => userDepartment
            .filter(item => item.departmentId === department.id)
            .map(item => user[item.userId])
    }
     */
    @ManyToMany
    @JoinTable(name = "DEPARTMENT_USER")
    private List<User> user;
}
