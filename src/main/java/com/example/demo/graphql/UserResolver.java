package com.example.demo.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;
import com.example.demo.domain.Department;
import com.example.demo.domain.User;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.UserRepository;
import graphql.schema.DataFetchingEnvironment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Frank.Park on 2018. 9. 20..
 */

/*
    User: {
        department: (user, args, context, info) => userDepartment
            .filter(item => item.userId === user.id)
            .map(item => department[item.departmentId])
            .filter(item => args.category ? item.category === args.category : true)
    }
     */

@Component
public class UserResolver implements GraphQLResolver<User> {
    private final DepartmentRepository departmentRepository;

    @Autowired
    public UserResolver(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getDepartment(User user, String category) {
        if(category == null) return user.getDepartment();
        return departmentRepository.findAllByUserAndCategory(user, category);
    }
}
