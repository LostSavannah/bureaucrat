import uuid
from .client.common.queues import QueueService

baseUrl = "http://localhost:19760"

queues:QueueService = QueueService(baseUrl)

def test_on_enqueue_gets_created():
    queue_name:str = str(uuid.uuid4())
    queues.enqueue(queue_name, "Content")
    assert queue_name in queues.queues()
    queues.delete_queue(queue_name)

def test_on_dequeue_gets_created():
    queue_name:str = str(uuid.uuid4())
    queues.dequeue(queue_name)
    assert queue_name in queues.queues()
    queues.delete_queue(queue_name)

def test_on_delete_gets_delete():
    queue_name:str = str(uuid.uuid4())
    queues.dequeue(queue_name)
    assert queue_name in queues.queues()
    queues.delete_queue(queue_name)
    assert queue_name not in queues.queues()

def test_on_enqueue_dequeue_keeps_order():
    queue_name:str = str(uuid.uuid4())
    values = [str(uuid.uuid4()) for i in range(100)]
    for value in values:
        queues.enqueue(queue_name, value)
    values.reverse()
    while len(values) > 0:
        assert values.pop() == queues.dequeue(queue_name)
    queues.delete_queue(queue_name)
    assert queue_name not in queues.queues()
    
def test_on_dequeue_on_empty_queue_returns_none():
    queue_name:str = str(uuid.uuid4())
    assert queues.dequeue(queue_name) == None

def test_on_dequeue_on_non_empty_queue_returns_value():
    queue_name:str = str(uuid.uuid4())
    queues.enqueue(queue_name, "content")
    assert queues.dequeue(queue_name) is not None