from boxedfactory.core.process_worker import ProcessWorker, LogKind

class ExampleModuleWorker(ProcessWorker):
    def __init__(self, interval: float = 1, log_size: int = 100) -> None:
        super().__init__(False)

    def main_event_loop(self):
        self.state.meta["Active"] = True
        try:
            self.state.log("Ready")
        except Exception as e:
            self.state.log("Error", kind=LogKind.Error, detail=str(e))