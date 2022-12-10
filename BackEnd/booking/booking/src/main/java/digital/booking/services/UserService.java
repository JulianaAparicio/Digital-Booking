package digital.booking.services;

import digital.booking.entities.User;
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
import java.util.regex.Pattern;

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
        } else if (user.getName().length() ==0 && user.getLastName().length() ==0 && user.getPassword().length() ==0) {
            logger.error("The user information has empty values.");
            throw new BadRequestException("The user's data must have information.");
        } else if(!validateEmail(user.getEmail())) {
            logger.error("The user's email is invalid.");
            throw new BadRequestException("The user's email is invalid..");
        } else if (user.getPassword().length() <= 7) {
            logger.error("The user's password is invalid.");
            throw new BadRequestException("The user's password must be at least 7 characters");
        } else {
            logger.debug("Creating new user...");

            Optional<User> userExists = userRepository.findByEmail(user.getEmail());
            if (userExists.isPresent()) {
                logger.error("The user email entered already exists is null.");
                throw new BadRequestException("The user with email " + user.getEmail() + " already exists");
            }

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

    public boolean validateEmail (String email){
        String emailRegex = "[a-zA-Z0-9!#$%&'*_+-]([.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|\\d)+[a-zA-Z0-9][.][a-zA-Z]{2,4}([.][a-zA-Z]{2})?";

        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }
}
