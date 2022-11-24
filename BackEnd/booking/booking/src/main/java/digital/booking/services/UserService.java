package digital.booking.services;

import digital.booking.DTO.ProductDTO;
import digital.booking.entities.Product;
import digital.booking.entities.Role;
import digital.booking.entities.User;
import digital.booking.entities.UserRoleEnum;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.mails.RegisterMail;
import digital.booking.repositories.RoleRepository;
import digital.booking.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IService<User> {

    private final Logger logger = Logger.getLogger(ProductService.class);

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    public List<User> searchAll() {
        return null;
    }

    @Override
    public User searchById(Long id) throws NotFoundException {
        return null;
    }

    @Override
    public User create(User user) throws BadRequestException {
        if (user == null){
            logger.error("The user entered is null.");
            throw new BadRequestException("The user is null.");
        } else {
            logger.debug("Creating new user...");

            Optional<User> userExists = userRepository.findByEmail(user.getEmail());
            if (userExists.isPresent()) {
                logger.error("The user email entered already exists is null.");
                throw new BadRequestException("The user with email " + user.getEmail() + " already exists");
            }
            Role role = roleRepository.findByName(UserRoleEnum.USER);
            user.setRole(role);

            User userCreated = userRepository.save(user);
            RegisterMail.sendRegisterEmail(userCreated);
            return userCreated;
        }
    }

    @Override
    public User update(User entity, Long id) throws NotFoundException {
        return null;
    }

    @Override
    public void delete(Long id) throws ServiceException, NotFoundException {

    }
}
