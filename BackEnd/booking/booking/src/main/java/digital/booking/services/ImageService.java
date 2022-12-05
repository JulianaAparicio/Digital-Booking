package digital.booking.services;

import digital.booking.DTO.ImageDTO;
import digital.booking.entities.Image;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.ImageRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService implements IService<Image> {

    @Autowired
    ImageRepository imageRepository;

    @Override
    public List<Image> searchAll() {
        return null;
    }

    @Override
    public Image searchById(Long id) throws NotFoundException {
        return null;
    }

    @Override
    public Image create(Image image) throws BadRequestException {
        return imageRepository.save(image);
    }

    @Override
    public Image update(Image entity, Long id) throws NotFoundException {
        return null;
    }

    @Override
    public void delete(Long id) throws ServiceException, NotFoundException {

    }
}
