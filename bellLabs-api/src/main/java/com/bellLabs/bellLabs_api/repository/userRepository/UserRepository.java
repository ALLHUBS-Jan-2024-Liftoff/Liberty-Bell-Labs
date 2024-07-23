package com.bellLabs.bellLabs_api.repository.userRepository;

import com.bellLabs.bellLabs_api.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
