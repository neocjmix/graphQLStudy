package com.example.demo.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.domain.User;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Frank.Park on 2018. 9. 20..
 */

/*
const resolvers = {


    Query: {
        user: (obj, args, context, info) => user[args.id],
        allUser: () => user
    }
};
 */

@Component
public class Query implements GraphQLQueryResolver {

    private final UserRepository userRepository;

    @Autowired
    public Query(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(long id) {
        return userRepository.getOne(id);
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}