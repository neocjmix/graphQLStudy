package com.example.demo.graphql;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.domain.User;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Frank.Park on 2018. 9. 20..
 */

/*
Mutation: {
    updateUser: (obj, args, context, info) => user[args.user.id] = {...user[args.user.id], ...args.user}
}
 */
@Component
public class Mutation implements GraphQLMutationResolver {
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;

    @Autowired
    public Mutation(UserRepository userRepository, DepartmentRepository departmentRepository) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
    }

    public User updateUser(User.UserInput user) {
        User userFromDB = userRepository.getOne(user.getId());
        userFromDB.setId(user.getId());
        userFromDB.setName(user.getName());
        userFromDB.setUsername(user.getUsername());
        userFromDB.setIsVacation(user.getIsVacation());
        userFromDB.setDepartment(departmentRepository.findAllById(user.getDepartment()));
        return userRepository.save(userFromDB);
    }
}
