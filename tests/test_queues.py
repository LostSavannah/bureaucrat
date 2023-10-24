from tools import enqueue, dequeue, delete_queue, get_lists

def test_on_enqueue_gets_created():
    queue_name = "test"
    enqueue(queue_name, "data")
    assert queue_name in get_lists()

def test_on_dequeue_gets_created():
    queue_name = "test"
    dequeue(queue_name)
    assert queue_name in get_lists()

def test_on_delete_gets_deleted():
    queue_name = "test"
    delete_queue(queue_name)
    assert queue_name not in get_lists()