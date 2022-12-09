package digital.booking.services;

import digital.booking.entities.Item;
import digital.booking.entities.Politic;
import digital.booking.exceptions.BadRequestException;
import digital.booking.repositories.ItemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class ItemServiceTest {

    @Mock
    ItemRepository itemRepository;

    @InjectMocks
    ItemService itemService;

    @Mock
    private Politic politicTest;

    private Item itemTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        politicTest = new Politic();
        itemTest = new Item(1L,"descriptionTest",politicTest);
        itemRepository.save(itemTest);
    }

    @Test
    void create() {
            try{
                when(itemRepository.save(any(Item.class))).thenReturn(itemTest);

                Item item = new Item();
                item.setId(1L);
                item.setDescription("descriptionTest");
                item.setPolitic(politicTest);

                Item itemCreated = itemService.create(item);

                // Verifies if item is null:
                assertNotNull(itemCreated,"The item is null");

                // Verifies item's attributes:
                assertEquals(itemTest.getDescription(), itemCreated.getDescription(), "Descriptions don't match.");
                assertEquals(itemTest.getPolitic(), itemCreated.getPolitic(), "Politics don't match.");

            } catch (BadRequestException e){
                e.printStackTrace();
            }
    }
}