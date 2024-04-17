import uuid
from .client.pybureaucrat.queues import QueueService

baseUrl = "http://localhost:19970"

queues:QueueService = QueueService(baseUrl)

async def test_on_enqueue_gets_created():
    queue_name:str = str(uuid.uuid4())
    await queues.enqueue(queue_name, "Content")
    assert queue_name in await queues.queues()
    await queues.delete_queue(queue_name)

async def test_on_dequeue_gets_created():
    queue_name:str = str(uuid.uuid4())
    await queues.dequeue(queue_name)
    assert queue_name in await queues.queues()
    await queues.delete_queue(queue_name)

async def test_on_delete_gets_delete():
    queue_name:str = str(uuid.uuid4())
    await queues.dequeue(queue_name)
    assert queue_name in await queues.queues()
    await queues.delete_queue(queue_name)
    assert queue_name not in await queues.queues()

async def test_on_enqueue_dequeue_keeps_order():
    queue_name:str = str(uuid.uuid4())
    values = [str(uuid.uuid4()) for i in range(100)]
    for value in values:
        await queues.enqueue(queue_name, value)
    values.reverse()
    while len(values) > 0:
        assert values.pop() == await queues.dequeue(queue_name)
    await queues.delete_queue(queue_name)
    assert queue_name not in await queues.queues()
    
async def test_on_dequeue_on_empty_queue_returns_none():
    queue_name:str = str(uuid.uuid4())
    assert await queues.dequeue(queue_name) == None

async def test_on_dequeue_on_non_empty_queue_returns_value():
    queue_name:str = str(uuid.uuid4())
    await queues.enqueue(queue_name, "content")
    assert await queues.dequeue(queue_name) is not None