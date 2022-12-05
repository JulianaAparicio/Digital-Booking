package digital.booking.services;

import digital.booking.entities.Item;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.ItemRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService implements IService<Item> {
    @Autowired
    ItemRepository itemRepository;

    @Override
    public List<Item> searchAll() {
        return null;
    }

    @Override
    public Item searchById(Long id) throws NotFoundException {
        return null;
    }

    @Override
    public Item create(Item item) throws BadRequestException {
        return itemRepository.save(item);
    }

    @Override
    public Item update(Item entity, Long id) throws NotFoundException {
        return null;
    }

    @Override
    public void delete(Long id) throws ServiceException, NotFoundException {

    }
}
