package com.bellLabs.bellLabs_api.repository.userRepository;

import com.bellLabs.bellLabs_api.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
