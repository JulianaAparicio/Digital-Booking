package digital.booking.services;

import digital.booking.entities.Amenity;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.AmenityRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmenityService implements IService<Amenity> {
    @Autowired
    AmenityRepository amenityRepository;

    @Override
    public List<Amenity> searchAll() {
        return amenityRepository.findAll();
    }

    @Override
    public Amenity searchById(Long id) throws NotFoundException {
        return null;
    }

    @Override
    public Amenity create(Amenity entity) throws BadRequestException {
        return null;
    }

    @Override
    public Amenity update(Amenity entity, Long id) throws NotFoundException {
        return null;
    }

    @Override
    public void delete(Long id) throws ServiceException, NotFoundException {

    }
}
