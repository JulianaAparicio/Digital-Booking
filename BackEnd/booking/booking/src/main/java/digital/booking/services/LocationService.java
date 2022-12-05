package digital.booking.services;

import digital.booking.entities.Location;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.LocationRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService implements IService<Location> {
    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Location> searchAll() {
        return null;
    }

    @Override
    public Location searchById(Long id) throws NotFoundException {
        return null;
    }

    @Override
    public Location create(Location location) throws BadRequestException {
        return locationRepository.save(location);
    }

    @Override
    public Location update(Location entity, Long id) throws NotFoundException {
        return null;
    }

    @Override
    public void delete(Long id) throws ServiceException, NotFoundException {

    }
}
